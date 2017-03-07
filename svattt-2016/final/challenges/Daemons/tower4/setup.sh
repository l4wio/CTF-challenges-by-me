#!/bin/bash

apt-get -y install python python-pip
pip install flask

user=tower4
binary=tower4.py
database=tower4.db
stuff=my_secret_you_dont_know_do_you
port=5000

useradd $user
mkdir /home/$user
cp $binary /home/$user/
> /home/$user/$database
cp $stuff /home/$user/
chown -R $user:$user /home/$user
chown root:$user /home/$user/$binary
chown root:$user /home/$user/$stuff
chown $user:$user /home/$user/$database
chmod 2750 /home/$user/$binary
chmod 0770 /home/$user/$database
chmod 0740 /home/$user/$stuff

echo "SVATTT{is_it_template_injectiOn}" > /home/$user/flag
chown root:$user /home/$user/flag && chmod 440 /home/$user/flag;

echo >> /home/$user/access.log
chown root:$user /home/$user/access.log && chmod 420 /home/$user/access.log;

rm /home/$user/.*

su tower4 -c "screen -d -m /home/tower4/tower4.py"