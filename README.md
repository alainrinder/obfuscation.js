# obfuscation.js
Convert javascript code into executable obfuscated javascript code.

### Description
Similarly to "eval", "obfuscate" function take one string as argument, representing a JavaScript expression or statement.
It returns another string, representing the same JavaScript code, using only non-alphanumeric characters ("JSFuck"), such as "_", "$", "+", "[", "]", "{", "}", ... 
Evalutating this string will produce the same result as evaluating the initial string.
The obfuscated string will have an approximated length of 632 + 6.5*l (with l being the input string length).

### Example
    obfuscate("alert('Hello World!');");
> `"_=~[],____=++_,___$=++_,__$_=++_,__$$=++_,_$__=++_,_$_$=++_,_$$_=++_,_$$$=++_,$___=++_,$__$=++_,$_$_=(![]+"")[___$],$_$$=({}+"")[__$_],$$__=({}+"")[_$_$],$$_$=(_[_]+"")[__$_],$$$_=(_[_]+"")[__$$],$$$$=(_[_]+"")[_$__],$__$_=(_[_]+"")[_$_$],$__$$=({}+"")[__$$],$_$_$=(![]+"")[__$_],$_$$$=(_[_]+"")[___$],$$___=({}+"")[___$],$$_$$=(!""+"")[___$],$$$__=(![]+"")[__$$],$$$_$=(!""+"")[____],$$$$_=(!""+"")[__$_],$_=$$__+$$___+$_$$$+$$$__+$$$_$+$$_$$+$$$$_+$$__+$$$_$+$$___+$$_$$,_$=$$_$$+$$$_+$$$_$+$$$$_+$$_$$+$_$$$,$$=____[$_][$_],__=$$($_$_,$_$$,$$__,_$+' ($$("'+_$+' \\"\\\\"+'+$_$_+"+"+$_$$+"+"+$$__+' + "\\""))();'),$$($$(_$+" "+$_$_+$_$_$+$$$_+$$_$$+$$$_$+"("+"\'"+__(___$,___$,____)+$$$_+$_$_$+$_$_$+$$___+" "+__(___$,__$_,_$$$)+$$___+$$_$$+$_$_$+$$_$+"!"+"\'"+")"+";")())();"`

Then you can execute the following JavaScript command to display an alert "Hello World!":

    _=~[],____=++_,___$=++_,__$_=++_,__$$=++_,_$__=++_,_$_$=++_,_$$_=++_,_$$$=++_,$___=++_,$__$=++_,$_$_=(![]+"")[___$],$_$$=({}+"")[__$_],$$__=({}+"")[_$_$],$$_$=(_[_]+"")[__$_],$$$_=(_[_]+"")[__$$],$$$$=(_[_]+"")[_$__],$__$_=(_[_]+"")[_$_$],$__$$=({}+"")[__$$],$_$_$=(![]+"")[__$_],$_$$$=(_[_]+"")[___$],$$___=({}+"")[___$],$$_$$=(!""+"")[___$],$$$__=(![]+"")[__$$],$$$_$=(!""+"")[____],$$$$_=(!""+"")[__$_],$_=$$__+$$___+$_$$$+$$$__+$$$_$+$$_$$+$$$$_+$$__+$$$_$+$$___+$$_$$,_$=$$_$$+$$$_+$$$_$+$$$$_+$$_$$+$_$$$,$$=____[$_][$_],__=$$($_$_,$_$$,$$__,_$+' ($$("'+_$+' \\"\\\\"+'+$_$_+"+"+$_$$+"+"+$$__+' + "\\""))();'),$$($$(_$+" "+$_$_+$_$_$+$$$_+$$_$$+$$$_$+"("+"\'"+__(___$,___$,____)+$$$_+$_$_$+$_$_$+$$___+" "+__(___$,__$_,_$$$)+$$___+$$_$$+$_$_$+$$_$+"!"+"\'"+")"+";")())();

### How does it work?

    _ = ~[]; // -1
    
    ____  = ++_; // 0
    ___$  = ++_; // 1
    __$_  = ++_; // 2
    __$$  = ++_; // 3
    _$__  = ++_; // 4
    _$_$  = ++_; // 5
    _$$_  = ++_; // 6
    _$$$  = ++_; // 7
    $___  = ++_; // 8
    $__$  = ++_; // 9
    
    $_$_  = (![]  + "")[___$]; // "a" (from "false")
    $_$$  = ({}   + "")[__$_]; // "b" (from "[object Object]")
    $$__  = ({}   + "")[_$_$]; // "c" (from "[object Object]")
    $$_$  = (_[_] + "")[__$_]; // "d" (from "undefined")
    $$$_  = (_[_] + "")[__$$]; // "e" (from "undefined")
    $$$$  = (_[_] + "")[_$__]; // "f" (from "undefined")
    
    $__$_ = (_[_] + "")[_$_$]; // "i" (from "undefined")
    $__$$ = ({}   + "")[__$$]; // "j" (from "[object Object]")
    $_$_$ = (![]  + "")[__$_]; // "l" (from "false")
    $_$$$ = (_[_] + "")[___$]; // "n" (from "undefined")
    $$___ = ({}   + "")[___$]; // "o" (from "[object Object]")
    $$_$$ = (!""  + "")[___$]; // "r" (from "true")
    $$$__ = (![]  + "")[__$$]; // "s" (from "false")
    $$$_$ = (!""  + "")[____]; // "t" (from "true")
    $$$$_ = (!""  + "")[__$_]; // "u" (from "true")
    
    $_ = $$__ + $$___ + $_$$$ + $$$__ + $$$_$ + $$_$$ + $$$$_ + $$__ + $$$_$ + $$___ + $$_$$; // "constructor"
    _$ = $$_$$ + $$$_ + $$$_$ + $$$$_ + $$_$$ + $_$$$; // "return"
    
    $$ = (____)[$_][$_]; // Function (constructor of Number, the constructor of 0)
    __ = $$($_$_, $_$$, $$__, _$ + ' ($$("' + _$ + ' \\"\\\\"+' + $_$_ + '+' + $_$$ + '+' + $$__ + ' + "\\""))();'); // Get a character from its octal representation: __(1, 4, 7) returns "g" ("\147")

    $$($$(_$+" "+...)())(); // Function(Function("return ...")())();
