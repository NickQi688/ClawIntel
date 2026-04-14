#!/bin/bash
# IMA 凭证配置脚本

# 创建配置目录
mkdir -p ~/.config/ima

# 保存 Client ID
echo "d289aebbf5635776ae31e974b48dab1e" > ~/.config/ima/client_id

# 保存 API Key
echo "F7p3ZnTRTCTBZTp1wgPUtlG/oUGJmCzabVGJRwSoTN2rscwL1iyIX8R2H9rri0pfpukgh26sEw==" > ~/.config/ima/api_key

# 设置权限
chmod 600 ~/.config/ima/client_id
chmod 600 ~/.config/ima/api_key

echo "✅ IMA 凭证配置完成！"
echo "Client ID: d289aebbf5635776ae31e974b48dab1e"
echo "API Key: F7p3ZnTRTCTBZTp1wgPUtlG/oUGJmCzabVGJRwSoTN2rscwL1iyIX8R2H9rri0pfpukgh26sEw=="
