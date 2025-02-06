import os
import win32security
import win32api
import win32con
import getpass
import json
import hashlib
import ntsecuritycon
from pathlib import Path

CONFIG_FILE = "folder_config.json"
DATA_FOLDER = "./data"

def take_ownership(folder_path):
    """获取文件夹的所有权"""
    # 获取SYSTEM用户的SID
    system_sid = win32security.ConvertStringSidToSid("S-1-5-18")
    
    # 获取当前的安全描述符
    sd = win32security.GetFileSecurity(
        folder_path, 
        win32security.OWNER_SECURITY_INFORMATION
    )
    
    # 将所有者设置为SYSTEM
    sd.SetSecurityDescriptorOwner(system_sid, False)
    win32security.SetFileSecurity(
        folder_path,
        win32security.OWNER_SECURITY_INFORMATION,
        sd
    )

def init_folder_protection(folder_path, password):
    """初始化文件夹保护"""
    try:
        Path(folder_path).mkdir(parents=True, exist_ok=True)
        
        # 获取SYSTEM用户的SID
        system_sid = win32security.ConvertStringSidToSid("S-1-5-18")
        
        # 获取当前用户的SID
        username = getpass.getuser()
        user_sid = win32security.LookupAccountName(None, username)[0]
        
        # 创建新的DACL
        dacl = win32security.ACL()
        
        # 给SYSTEM完全控制权限
        dacl.AddAccessAllowedAce(
            win32security.ACL_REVISION,
            win32con.GENERIC_ALL,
            system_sid
        )
        
        # 给当前用户拒绝所有访问权限
        dacl.AddAccessDeniedAce(
            win32security.ACL_REVISION,
            win32con.GENERIC_ALL,
            user_sid
        )
        
        # 设置新的安全描述符
        sd = win32security.GetFileSecurity(
            folder_path, 
            win32security.DACL_SECURITY_INFORMATION | win32security.OWNER_SECURITY_INFORMATION
        )
        
        # 设置SYSTEM为所有者
        sd.SetSecurityDescriptorOwner(system_sid, False)
        sd.SetSecurityDescriptorDacl(1, dacl, 0)
        
        # 应用安全设置
        win32security.SetFileSecurity(
            folder_path,
            win32security.DACL_SECURITY_INFORMATION | win32security.OWNER_SECURITY_INFORMATION,
            sd
        )
        
        # 遍历文件夹中的所有文件和子文件夹,应用相同的权限
        for root, dirs, files in os.walk(folder_path):
            for d in dirs:
                path = os.path.join(root, d)
                take_ownership(path)
                win32security.SetFileSecurity(
                    path,
                    win32security.DACL_SECURITY_INFORMATION,
                    sd
                )
            for f in files:
                path = os.path.join(root, f)
                take_ownership(path)
                win32security.SetFileSecurity(
                    path,
                    win32security.DACL_SECURITY_INFORMATION,
                    sd
                )
        
        # 保存配置
        config = {
            "password_hash": hashlib.sha256(password.encode()).hexdigest(),
            "folder_path": folder_path
        }
        
        with open(CONFIG_FILE, "w") as f:
            json.dump(config, f)
            
        print(f"文件夹 {folder_path} 已成功设置保护")
        return True
        
    except Exception as e:
        print(f"设置保护失败: {str(e)}")
        return False

def unlock_folder(password):
    """解锁文件夹访问"""
    try:
        with open(CONFIG_FILE, "r") as f:
            config = json.load(f)
        
        if hashlib.sha256(password.encode()).hexdigest() != config["password_hash"]:
            print("密码错误")
            return False
            
        folder_path = config["folder_path"]
        
        # 获取当前用户的SID
        username = getpass.getuser()
        user_sid = win32security.LookupAccountName(None, username)[0]
        
        # 创建允许访问的DACL
        sd = win32security.GetFileSecurity(
            folder_path, 
            win32security.DACL_SECURITY_INFORMATION
        )
        
        # 临时将所有权给当前用户以修改权限
        sd.SetSecurityDescriptorOwner(user_sid, False)
        win32security.SetFileSecurity(
            folder_path,
            win32security.OWNER_SECURITY_INFORMATION,
            sd
        )
        
        dacl = win32security.ACL()
        dacl.AddAccessAllowedAce(
            win32security.ACL_REVISION,
            win32con.GENERIC_READ | win32con.GENERIC_EXECUTE,
            user_sid
        )
        
        sd.SetSecurityDescriptorDacl(1, dacl, 0)
        win32security.SetFileSecurity(
            folder_path,
            win32security.DACL_SECURITY_INFORMATION,
            sd
        )
        
        print("文件夹已解锁")
        return True
        
    except Exception as e:
        print(f"解锁失败: {str(e)}")
        return False

def lock_folder():
    """重新锁定文件夹"""
    try:
        with open(CONFIG_FILE, "r") as f:
            config = json.load(f)
            
        folder_path = config["folder_path"]
        
        # 获取当前用户的SID
        username = getpass.getuser()
        user_sid = win32security.LookupAccountName(None, username)[0]
        
        # 创建限制访问的DACL
        dacl = win32security.ACL()
        dacl.AddAccessAllowedAce(
            win32security.ACL_REVISION,
            win32con.GENERIC_ALL,  # 仅管理员权限
            user_sid
        )
        
        # 设置新的安全描述符
        sd = win32security.GetFileSecurity(
            folder_path, 
            win32security.DACL_SECURITY_INFORMATION
        )
        sd.SetSecurityDescriptorDacl(1, dacl, 0)
        
        win32security.SetFileSecurity(
            folder_path,
            win32security.DACL_SECURITY_INFORMATION,
            sd
        )
        
        print("文件夹已锁定")
        return True
        
    except Exception as e:
        print(f"锁定失败: {str(e)}")
        return False

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("使用方法:")
        print("初始化: python a.py init <密码>")
        print("解锁: python a.py unlock <密码>")
        print("锁定: python a.py lock")
        sys.exit(1)
        
    command = sys.argv[1]
    
    if command == "init" and len(sys.argv) == 3:
        init_folder_protection(DATA_FOLDER, sys.argv[2])
    elif command == "unlock" and len(sys.argv) == 3:
        unlock_folder(sys.argv[2])
    elif command == "lock":
        lock_folder()
    else:
        print("无效的命令")
