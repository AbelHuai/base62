declare class Base62x {
    isdebug: boolean;
    i: number;
    codetype: number;
    constructor();
    static encode(input: any, ibase: any): string | undefined;
    static decode(input: any, obase: any): string | undefined;
    encode(input: any, ibase: any): string | undefined;
    decode(input: any, obase: any): string | undefined;
    static get(k: any): any;
    static set(k: any, v: any): undefined;
    static fillRb62x(b62x: any, bpos: any, xpos: any): {};
    static setAscii(codetype: any, inputArr: any, ascidx: any, ascmax: any, asclist: any, ascrlist: any): {};
    static xx2dec(input: any, ibase: any, rb62x: any): string;
    static dec2xx(num_input: any, obase: any, b62x: any): string;
    get(k: any): any;
    set(k: any, v: any): undefined;
    static decodeByLength(tmpArr: any, op: any, m: any): {};
    static toUTF8Array(utf16Str: any): any[];
    static toUTF16Array(utf8Bytes: any): string[];
}
declare const Base62: Base62x;
export default Base62;
export { Base62 };
