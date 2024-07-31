
import HOTP from "./hotp";

/**
 * Class encapsulating TOTP-related methods.
 * 
 * ## Example
 * ```js
 * let key = [0x78, 0x64];
 * let totp = new TOTP(key);
 * console.log(totp.value());
 * ```
 */

class TOTP {
    key: string;
    interval: number;

    constructor(key: string, interval?: number) {
        this.key = key;
        this.interval = interval ?? 30;
    }
    /**
     * Gets the current TOTP value based on the system's time.
     * Uses the HOTP implementation from `hotp.ts`.
     * 
     * @returns {number} current TOTP value
     */
    value(): number {
        let hotp = new HOTP(base32Decode(this.key), this.counter());
        return hotp.value();
    }

    /**
     * Calculates the current counter value based on the system's time and the given interval.
     * Does this by performing integer division between the time in seconds and the interval.
     * 
     * @returns {number} current counter value
     */
    counter(): number {
        let currentTime = Math.floor(new Date().getTime() / 1000); // Unix time in seconds
        let counterValue = currentTime / this.interval; // Divide by the interval

        // Floor the value to an integer
        return Math.floor(counterValue);
    }

    /**
     * Calculates the time until the TOTP value will change in milliseconds.
     * This is useful to show the user how long their code will be valid for.
     * 
     * @returns {number} time until the code will change in milliseconds
     */
    timeUntilUpdate(): number {
        return 30000 - (new Date().getTime() % (this.interval * 1000));
    }
}

const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

function base32Decode(encoded: string) {
    encoded = encoded.replace(/ /g, ''); // Remove spaces
    let decoded = [];
    let buffer = 0;
    let bitsLeft = 0;

    for (let i = 0; i < encoded.length; i++) {
        const c = encoded[i];
        const value = base32Chars.indexOf(c.toUpperCase());
        if (value === -1) throw new Error("Invalid Base32 character");

        buffer = (buffer << 5) | value;
        bitsLeft += 5;

        if (bitsLeft >= 8) {
            decoded.push((buffer >> (bitsLeft - 8)) & 0xff);
            bitsLeft -= 8;
        }
    }

    return toHex(decoded);
}

function toHex(byteArray: any) {
    return byteArray.map((byte: any) => '0x' + byte.toString(16).padStart(2, '0'));
}

export default TOTP;
