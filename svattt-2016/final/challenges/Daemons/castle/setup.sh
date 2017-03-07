#!/bin/bash

apt-get -y install xinetd libc6:i386

user=castle
binary=castle
port=31330

useradd $user
mkdir /home/$user
cp $binary /home/$user/
cp intro.txt /home/$user/
cp intro2.txt /home/$user/
chown -R root:root /home/$user
chown root:$user /home/$user/$binary
chmod 2750 /home/$user/$binary

echo "SVATTT{welcome_t0_th3_dark_c4stle}" > /home/$user/flag
chown root:$user /home/$user/flag && chmod 440 /home/$user/flag;
chown root:$user /home/$user/intro.txt && chmod 440 /home/$user/intro.txt;
chown root:$user /home/$user/intro2.txt && chmod 440 /home/$user/intro2.txt;

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
