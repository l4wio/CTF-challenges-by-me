#!/bin/bash

apt-get install xinetd

user=c0ffee
binary=c0ffee
port=31334

useradd $user
mkdir /home/$user
cp $binary /home/$user/
chown -R root:root /home/$user
chown root:$user /home/$user/$binary
chmod 2755 /home/$user/$binary

echo "MeePwnCTF{you_may_want_to_try_vietnamese_milk_c0ffee!}" > /home/$user/flag
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
    flags = REUSE
    per_source = 5
    rlimit_cpu = 3
    nice = 18
}
EOF

service xinetd restart