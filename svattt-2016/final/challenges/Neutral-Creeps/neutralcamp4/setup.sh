#!/bin/bash

apt-get install xinetd libc6:i386

user=camp4
binary=profile
port=40004

useradd $user
mkdir /home/$user
cp $binary /home/$user/
chown -R root:root /home/$user
chown root:$user /home/$user/$binary
chmod 2750 /home/$user/$binary

echo "SVATTT{C_to_V_to_E_2016_eight_six_two_one}" > /home/$user/flag
chown root:$user /home/$user/flag && chmod 440 /home/$user/flag;

cat <<EOF > /etc/xinetd.d/$user
service $user
{
    disable = no
    socket_type = stream
    protocol    = tcp
    wait        = no
    user        = $user
    bind        = 0.0.0.0
    server      = /home/$user/$binary
    type        = UNLISTED
    port        = $port
}
EOF

service xinetd restart
