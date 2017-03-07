#!/bin/bash

apt-get install xinetd

user=winner
binary=winner
port=31335

useradd $user
mkdir /home/$user
cp $binary /home/$user/
cp intro.txt /home/$user/

chown -R root:root /home/$user
chown root:$user /home/$user/$binary
chmod 2755 /home/$user/$binary

echo "SVATTT{y0u_are_true_winner_pwner_as_w3ll}" > /home/$user/flag
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
