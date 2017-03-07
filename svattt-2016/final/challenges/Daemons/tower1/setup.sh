#!/bin/bash

apt-get -y install xinetd libc6:i386

user=tower1
binary=tower1
port=31331

useradd $user
mkdir /home/$user
cp $binary /home/$user/
chown -R root:root /home/$user
chown root:$user /home/$user/$binary
chmod 2750 /home/$user/$binary

dd if=/dev/urandom of=/home/$user/poc bs=1024 count=1
chown root:$user /home/$user/poc && chmod 440 /home/$user/poc;

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
