const fs = require("fs");
class BinaryReader {
	constructor(buf) {
		this.buff = buf;
        this.index = 0;
   	}
	read_short() {
		var val = this.buff.readUInt16LE(this.index);
        this.index += 2;
        return val;
    }
    read_int() {
    	var val = this.buff.readInt32LE(this.index);
		this.index += 4
    	return val;
    }
    read_char() {
    	var val = this.buff[this.index];
        this.index++;
    	return val;
    }
}
var SECRET = "PBG892FXX982ABC*"
function xordec(id, nlen, pos, enc, data) {
    var str = '';
    if (enc == true) {
        for (var i = 0; i < nlen; i++) {
            str += String.fromCharCode(data[pos]);
            pos += 1;
        }
    } else {
        for (var i = 0; i < nlen; i++) {
            str += String.fromCharCode(data[pos] ^ SECRET.charCodeAt((id + i) % SECRET.length));
            pos += 1;
        }
    }
    return str;
}
fs.readFile("items.dat", function(err, buffer)
{
	if (err) {
		console.log("[ERROR] " + err);
		return;
	}
	const r = new BinaryReader(buffer);
	var version = r.read_short();
	var count = r.read_int();
	for (var i = 0; i < count; i++) {
    // do something
	    var id = r.read_int();
        var editableType = r.read_char();
        var itemCategory = r.read_char();
        var actionType = r.read_char();
        var hitsoundType = r.read_char();
	
	    var nameLen = r.read_short()
	    var name = xordec(id,nameLen,r.index, false, r.buff)
	    r.index += nameLen
	
	    var textLen = r.read_short()
	    var textureName = xordec(id,textLen,r.index, true, r.buff)
	    r.index += textLen
		
		var textureHash = r.read_int()
	    var itemKind = r.read_char()
	    var val1 = r.read_int()
	    var textureX = r.read_char()
	    var textureY = r.read_char()
	    var spreadType = r.read_char()
	    var isStripeyWallpaper = r.read_char()
	    var collisionType = r.read_char()
	    var breakHits = r.read_char()
	    var dropChance = r.read_int()
	    var clothingType = r.read_char()
	    var rarity = r.read_short()
	    var maxAmount = r.read_char()
		
		var extraLen = r.read_short()
	    var extraFile = xordec(id,extraLen,r.index, true, r.buff)
	    r.index += extraLen
	
	    var extraFileHash = r.read_int()
	    var audioVolume = r.read_int()
		
		var petNameLen = r.read_short()
	    var petName = xordec(id,petNameLen,r.index, true, r.buff)
	    r.index += petNameLen
	
	    var petPrefixLen = r.read_short()
	    var petPrefix = xordec(id,petPrefixLen,r.index, true, r.buff)
	    r.index += petPrefixLen
	
	    var petSuffixLen = r.read_short()
	    var petSuffix = xordec(id,petSuffixLen,r.index, true, r.buff)
	    r.index += petSuffixLen
	
	    var petAbilityLen = r.read_short()
	    var petAbility = xordec(id,petAbilityLen,r.index, true, r.buff)
	    r.index += petAbilityLen
		
		var seedBase = r.read_char()
	    var seedOverlay = r.read_char()
	    var treeBase = r.read_char()
	    var treeLeaves = r.read_char()
	    var seedColor = r.read_int()
	    var seedOverlayColor = r.read_int()
	    var unkval1 = r.read_int()
	    var growTime = r.read_int()
	    var val2 = r.read_short()
	    var isRayman = r.read_short()
		
		var extraOptionsLen = r.read_short()
	    var extraOptions = xordec(id,extraOptionsLen,r.index, true, r.buff)
	    r.index += extraOptionsLen
	
	    var texture2Len = r.read_short()
	    var texture2 = xordec(id,texture2Len,r.index, true, r.buff)
	    r.index += texture2Len
	
	    var extraOptions2Len = r.read_short()
	    var extraOptions2 = xordec(id,extraOptions2Len,r.index, true, r.buff)
	    r.index += extraOptions2Len
		
		r.index += 80 //skiped many data
		
		var punchOptionsLen = r.read_short()
	    var punchOptions = xordec(id,punchOptionsLen,r.index, true, r.buff)
	    r.index += punchOptionsLen
	
	    r.index += 13 + 8
		
	    console.log(name);
		
	}
});


