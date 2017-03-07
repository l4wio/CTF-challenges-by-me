#!/bin/bash

apt-get -y install python python-pip
pip install flask

user=tower2
binary=tower2.py
database=users.db
port=5000

useradd $user
mkdir /home/$user
cp $binary /home/$user/
cp $database /home/$user/
chown -R root:root /home/$user
chown root:$user /home/$user/$binary
chown root:$user /home/$user/$database
chmod 2750 /home/$user/$binary
chmod 0740 /home/$user/$database

echo "SVATTT{ez_sql_injectionnnnnn}" > /home/$user/flag
chown root:$user /home/$user/flag && chmod 440 /home/$user/flag;

echo >> /home/$user/access.log
chown root:$user /home/$user/access.log && chmod 420 /home/$user/access.log;

rm /home/$user/.*


su tower2 -c "screen -d -m /home/tower2/tower2.py"