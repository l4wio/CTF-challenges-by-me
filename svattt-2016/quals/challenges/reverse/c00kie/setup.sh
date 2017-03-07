#!/bin/bash

apt-get install xinetd

user=c00kie
binary=c00kie

useradd $user
mkdir /home/$user
cp $binary /home/$user/
chown -R root:root /home/$user
chown root:$user /home/$user/$binary
chmod 2755 /home/$user/$binary

echo "SVATTT{oh_u_got_the_cookie_yourself}" > /home/$user/flag
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
    port        = 31331
}
EOF

service xinetd restart
