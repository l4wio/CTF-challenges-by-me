#!/bin/bash

apt-get install ruby xinetd

useradd simplehttp
mkdir /home/simplehttp
cp main.rb /home/simplehttp/
chown -R root:root /home/simplehttp
chown root:simplehttp /home/simplehttp/main.rb
chmod 2755 /home/simplehttp/main.rb

echo "SVATTT{lul_ruby_is_very_weird}" > /_here_you_are_flagggggggggg_.txt
chown root:simplehttp /_here_you_are_flagggggggggg_.txt && chmod 440 /_here_you_are_flagggggggggg_.txt;

echo "1337.1337.1337.lol" > /home/simplehttp/ip_admin
echo "Sorry...the flag is in another castle :( Get shell if u can." > /home/simplehttp/secret_admin
for i in ip_admin secret_admin;
    do chown root:simplehttp /home/simplehttp/$i && chmod 440 /home/simplehttp/$i;
done;
cat <<EOF > /etc/xinetd.d/simplehttp
service simplehttp
{
    disable = no
    socket_type = stream
    protocol    = tcp
    wait        = no
    user        = simplehttp
    bind        = 0.0.0.0
    server      = /home/simplehttp/main.rb
    type        = UNLISTED
    port        = 31332
}
EOF

service xinetd restart
