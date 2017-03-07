from flag import *
import random, signal, sys

def handler(signum, frame):
    print 'Timeout'
    sys.exit(-1)

# Set the signal handler and a 60-second alarm
signal.signal(signal.SIGALRM, handler)
signal.alarm(60)

class Unbuffered(object):
   def __init__(self, stream):
       self.stream = stream
   def write(self, data):
       self.stream.write(data)
       self.stream.flush()
   def __getattr__(self, attr):
       return getattr(self.stream, attr)

sys.stdout = Unbuffered(sys.stdout)
##############################################

greet = ["'sup bro", "hey", "*nods*", "hey you get my snap?"]

def egcd(a, b):
    if a == 0:
        return (b, 0, 1)
    else:
        g, y, x = egcd(b % a, a)
        return (g, x - (b // a) * y, y)

def invmod(a, m):
    g, x, y = egcd(a, m)
    if g != 1:
        raise Exception('modular inverse does not exist')
    else:
        return x % m

def b2n(b):
    return int(b.encode('hex'),16)

def randbyte(nbytes):
    import os
    return os.urandom(nbytes)

N = pp * qq

def sign(x, key): # CRT compute msg ^ d  mod N, faster, saving my energy.
    d = 0x10001
    mp = pow(x, d, pp)
    mq = pow(x, d, qq)
    rp = invmod(pp, qq)
    rq = invmod(qq, pp)
    return (mp * qq * rq + mq * pp * rp) % key

def encrypt(x, key): # Encrypt is fast... no need to move my butt on CRT.
    d = 0x10001
    return pow(x, d, key)

encrypt_key = b2n(randbyte(100))
# Sending this to you via your token device....

sign_key = N ^ encrypt_key
# Originally I use N, but now I use OTP, why not!!!

banner = """
Welcome to OTP chatbot 2.0-alpha
You can chat with me, but unless you have the token, you can't read it.
To verify this is really me, you use my public key with the token, this is my newest features!!
Here is my public key: %d
You can try to verify this message first to ensure correctness of your key.
""" % N

print banner
print 'Signature code:', sign(b2n(banner), sign_key)

while True:
    msg = raw_input("> ")
    if 'FLAG?' in msg:
        res = FLAG
    elif 'hello' in msg or 'hi' in msg or 'good' in msg or 'chao' in msg:
        res = greet[random.randrange(0,len(greet))]
    else:
        res = 'What?!? ' + randbyte(10)

    enc = encrypt(b2n(res), encrypt_key)
    print enc
    print 'Signature code:', sign(enc, sign_key)
