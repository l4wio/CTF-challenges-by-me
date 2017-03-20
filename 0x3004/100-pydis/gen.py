import dis




def encode():
	FLAG_part_1 = 12292
	FLAG_part_2 = '{from_dis_import_Fl4G}'
	n = []
	for i in range(len(FLAG_part_2)-1):
		n.append( FLAG_part_1 ^ ord(FLAG_part_2[i]) ^ ord(FLAG_part_2[i+1]) )
	print n

encode()
def check_password(part1,part2):
	PASS_ENCODED = [12313, 12304, 12313, 12294, 12342, 12351, 12297, 12318, 12328, 12338, 12288, 12313, 12315, 12313, 12290, 12335, 12317, 12334, 12380, 12407, 12350]

	if len(part2) < len(PASS_ENCODED):
		return "Wrong :("
		
	for i in range(len(PASS_ENCODED) - 1):
		if (PASS_ENCODED[i] ^ int(part1,16)) != (ord(part2[i]) ^ ord(part2[i+1])):
			return "Wrong :("
	return "Password is correct!"


check_password('0x3004','{from_dis_import_Fl4G}')
dis.dis(check_password)