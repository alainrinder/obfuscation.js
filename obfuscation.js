//! obfuscation.js - Alain Rinder - 07.08.2016
//! 
//! Convert JavaScript code into executable obfuscated javascript code.
//!
//! Similarly to "eval", "obfuscate" function take one string as argument, representing a JavaScript expression or statement.
//! It returns another string, representing the same JavaScript code, using only non-alphanumeric characters, such as "_", "$", "+", "[", "]", "{", "}", ... (JSFuck)
//! Evalutating this string will produce the same result as evaluating the initial string.
//! The obfuscated string will have an approximated length of 632 + 6.5*l (with l being the input string length)
//!
//! EXAMPLE
//! obfuscate("alert('Hello World!');");
//! > "_=~[],____=++_,___$=++_,__$_=++_,__$$=++_,_$__=++_,_$_$=++_,_$$_=++_,_$$$=++_,$___=++_,$__$=++_,$_$_=(![]+"")[___$],$_$$=({}+"")[__$_],$$__=({}+"")[_$_$],$$_$=(_[_]+"")[__$_],$$$_=(_[_]+"")[__$$],$$$$=(_[_]+"")[_$__],$__$_=(_[_]+"")[_$_$],$__$$=({}+"")[__$$],$_$_$=(![]+"")[__$_],$_$$$=(_[_]+"")[___$],$$___=({}+"")[___$],$$_$$=(!""+"")[___$],$$$__=(![]+"")[__$$],$$$_$=(!""+"")[____],$$$$_=(!""+"")[__$_],$_=$$__+$$___+$_$$$+$$$__+$$$_$+$$_$$+$$$$_+$$__+$$$_$+$$___+$$_$$,_$=$$_$$+$$$_+$$$_$+$$$$_+$$_$$+$_$$$,$$=____[$_][$_],__=$$($_$_,$_$$,$$__,_$+' ($$("'+_$+' \\"\\\\"+'+$_$_+"+"+$_$$+"+"+$$__+' + "\\""))();'),$$($$(_$+" "+$_$_+$_$_$+$$$_+$$_$$+$$$_$+"("+"\'"+__(___$,___$,____)+$$$_+$_$_$+$_$_$+$$___+" "+__(___$,__$_,_$$$)+$$___+$$_$$+$_$_$+$$_$+"!"+"\'"+")"+";")())();"
//! _=~[],____=++_,___$=++_,__$_=++_,__$$=++_,_$__=++_,_$_$=++_,_$$_=++_,_$$$=++_,$___=++_,$__$=++_,$_$_=(![]+"")[___$],$_$$=({}+"")[__$_],$$__=({}+"")[_$_$],$$_$=(_[_]+"")[__$_],$$$_=(_[_]+"")[__$$],$$$$=(_[_]+"")[_$__],$__$_=(_[_]+"")[_$_$],$__$$=({}+"")[__$$],$_$_$=(![]+"")[__$_],$_$$$=(_[_]+"")[___$],$$___=({}+"")[___$],$$_$$=(!""+"")[___$],$$$__=(![]+"")[__$$],$$$_$=(!""+"")[____],$$$$_=(!""+"")[__$_],$_=$$__+$$___+$_$$$+$$$__+$$$_$+$$_$$+$$$$_+$$__+$$$_$+$$___+$$_$$,_$=$$_$$+$$$_+$$$_$+$$$$_+$$_$$+$_$$$,$$=____[$_][$_],__=$$($_$_,$_$$,$$__,_$+' ($$("'+_$+' \\"\\\\"+'+$_$_+"+"+$_$$+"+"+$$__+' + "\\""))();'),$$($$(_$+" "+$_$_+$_$_$+$$$_+$$_$$+$$$_$+"("+"\'"+__(___$,___$,____)+$$$_+$_$_$+$_$_$+$$___+" "+__(___$,__$_,_$$$)+$$___+$$_$$+$_$_$+$$_$+"!"+"\'"+")"+";")())();

function obfuscate(sScript)
{
  function hexCharName(sHexChar) 
  {
    var sBin = parseInt(sHexChar, 16).toString(2);
    return ("0000".substr(sBin.length) + sBin).replace(/1/g, "$").replace(/0/g, "_");
  }
  var asPredefinedLowerChars = ["i", "j", "l", "n", "o", "r", "s", "t", "u"];
  function predefinedLowerCharName(sChar)
  {
    var sBin = (sChar.charCodeAt(0) - "a".charCodeAt(0) + 0xa).toString(2);
    return ("00000".substr(sBin.length) + sBin).replace(/1/g, "$").replace(/0/g, "_"); 
  }
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
  function escape(sChar)
  {
    if (["\'", "\"", "\\"].indexOf(sChar) >= 0) return "\\" + sChar;
    else if (["\n", "\r", "\v", "\t", "\b", "\f"].indexOf(sChar) >= 0) return "";
    return sChar;
  }
  
  var sObfuscated = "' '";
  for (var c = 0, cc = sScript.length; c < cc; ++c)
  {
    sObfuscated += "+";
    var sChar = sScript[c]; 
    var nCharCode = sChar.charCodeAt(0);
    // http://www.asciitable.com/
    if (("0" <= sChar && sChar <= "9") || ("a" <= sChar && sChar <= "f")) sObfuscated += hexCharName(sChar);
    else if (asPredefinedLowerChars.indexOf(sChar) >= 0) sObfuscated += predefinedLowerCharName(sChar);
    else if ((0100 <= nCharCode && nCharCode <= 0132) // @ + upper chars
         ||  (0141 <= nCharCode && nCharCode <= 0172) // lower chars
         ||  (0200 <= nCharCode)) // accented chars, special chars, greek chars, ...
    {
      sOctalCharCode = nCharCode.toString(8);
      sObfuscated += "__(" 
        + hexCharName(sOctalCharCode[0]) + "," 
        + hexCharName(sOctalCharCode[1]) + ","
        + hexCharName(sOctalCharCode[2]) + ")";
    }
    else sObfuscated += '"' + escape(sChar) + '"';
  }
  // using an anonymous function avoid double dollar issues
  // http://stackoverflow.com/questions/9423722/string-replace-weird-behavior-when-using-dollar-sign-as-replacement
  return '_=~[],____=++_,___$=++_,__$_=++_,__$$=++_,_$__=++_,_$_$=++_,_$$_=++_,_$$$=++_,$___=++_,$__$=++_,$_$_=(![]+"")[___$],$_$$=({}+"")[__$_],$$__=({}+"")[_$_$],$$_$=(_[_]+"")[__$_],$$$_=(_[_]+"")[__$$],$$$$=(_[_]+"")[_$__],$__$_=(_[_]+"")[_$_$],$__$$=({}+"")[__$$],$_$_$=(![]+"")[__$_],$_$$$=(_[_]+"")[___$],$$___=({}+"")[___$],$$_$$=(!""+"")[___$],$$$__=(![]+"")[__$$],$$$_$=(!""+"")[____],$$$$_=(!""+"")[__$_],$_=$$__+$$___+$_$$$+$$$__+$$$_$+$$_$$+$$$$_+$$__+$$$_$+$$___+$$_$$,_$=$$_$$+$$$_+$$$_$+$$$$_+$$_$$+$_$$$,$$=____[$_][$_],__=$$($_$_,$_$$,$$__,_$+\' ($$("\'+_$+\' \\\\"\\\\\\\\"+\'+$_$_+"+"+$_$$+"+"+$$__+\' + "\\\\""))();\'),$$($$(_$+{{}})())();'
    .replace("{{}}", function() { return sObfuscated; });
}
