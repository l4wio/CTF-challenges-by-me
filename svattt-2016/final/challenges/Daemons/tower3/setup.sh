#!/bin/bash

apt-get -y install xinetd libc6:i386

user=tower3
binary=tower3
port=31333

useradd $user
mkdir /home/$user
cp $binary /home/$user/
cp intro.txt /home/$user/
chown -R root:root /home/$user
chown root:$user /home/$user/$binary
chmod 2750 /home/$user/$binary

echo "SVATTT{cURL_fixed_it_7.51.0_:p}" > /home/$user/flag
chown root:$user /home/$user/flag && chmod 440 /home/$user/flag;
chown root:$user /home/$user/intro.txt && chmod 440 /home/$user/intro.txt;
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
