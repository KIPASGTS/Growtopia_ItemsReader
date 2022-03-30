import struct
SECRET = "PBG892FXX982ABC*"
def xordec(id, nlen, pos, enc, data):
	str = ''
	if enc == True:
		for i in range(nlen):
			str += chr(data[pos])
			pos += 1
	else:
		for i in range(nlen):
			str += chr(data[pos] ^ ord(SECRET[(id + i) % len(SECRET)]))
			pos += 1
	return str
	
class BinaryReader:
		def __init__(self, fname):
			self.buff = open(fname, 'rb').read()
			self.index = 0
			
		def read_short(self):
			val = struct.unpack('<H', self.buff[self.index:self.index+2])[0]
			self.index += 2
			return val
			
		def read_int(self):
			val = struct.unpack('i', self.buff[self.index:self.index+4])[0]
			self.index += 4
			return val
			
		def read_char(self):
			val = self.buff[self.index]
			self.index += 1
			return val
			
		def read_int16(self):
			val = self.buff[self.index] + self.buff[self.index + 1] * 256
			self.index += 2
			return val


r = BinaryReader("items.dat")
ver = r.read_short()
count = r.read_int()

#Todo: Loop

for i in range(0,count):
	id = r.read_int()
	editableType = r.read_char()
	itemCategory = r.read_char()
	actionType = r.read_char()
	hitsoundType = r.read_char()
	
	nameLen = r.read_int16()
	name = xordec(id,nameLen,r.index, False, r.buff)
	r.index += nameLen
	
	textLen = r.read_int16()
	textName = xordec(id,textLen,r.index, True, r.buff)
	r.index += textLen
	
	textureHash = r.read_int()
	itemKind = r.read_char()
	val1 = r.read_int()
	textureX = r.read_char()
	textureY = r.read_char()
	spreadType = r.read_char()
	isStripeyWallpaper = r.read_char()
	collisionType = r.read_char()
	breakHits = r.read_char()
	dropChance = r.read_int()
	clothingType = r.read_char()
	rarity = r.read_short()
	maxAmount = r.read_char()
	
	extraLen = r.read_int16()
	extraFile = xordec(id,extraLen,r.index, True, r.buff)
	r.index += extraLen
	
	extraFileHash = r.read_int()
	audioVolume = r.read_int()
	
	petNameLen = r.read_int16()
	petName = xordec(id,petNameLen,r.index, True, r.buff)
	r.index += petNameLen
	
	petPrefixLen = r.read_int16()
	petPrefix = xordec(id,petPrefixLen,r.index, True, r.buff)
	r.index += petPrefixLen
	
	petSuffixLen = r.read_int16()
	petSuffix = xordec(id,petSuffixLen,r.index, True, r.buff)
	r.index += petSuffixLen
	
	petAbilityLen = r.read_int16()
	petAbility = xordec(id,petAbilityLen,r.index, True, r.buff)
	r.index += petAbilityLen
	
	seedBase = r.read_char()
	seedOverlay = r.read_char()
	treeBase = r.read_char()
	treeLeaves = r.read_char()
	seedColor = r.read_int()
	seedOverlayColor = r.read_int()
	unkval1 = r.read_int()
	growTime = r.read_int()
	val2 = r.read_short()
	isRayman = r.read_short()
	
	extraOptionsLen = r.read_int16()
	extraOptions = xordec(id,extraOptionsLen,r.index, True, r.buff)
	r.index += extraOptionsLen
	
	texture2Len = r.read_int16()
	texture2 = xordec(id,texture2Len,r.index, True, r.buff)
	r.index += texture2Len
	
	extraOptions2Len = r.read_int16()
	extraOptions2 = xordec(id,extraOptions2Len,r.index, True, r.buff)
	r.index += extraOptions2Len
	
	r.index += 80
	punchOptionsLen = r.read_int16()
	punchOptions = xordec(id,punchOptionsLen,r.index, True, r.buff)
	r.index += punchOptionsLen
	
	r.index += 13 + 8
	
