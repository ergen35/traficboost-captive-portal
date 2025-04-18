import { countries, type TCountryCode, getEmojiFlag } from "countries-list";
import { cache } from "react";

export const getCountries = cache(() => {

    const countryData = new Array<{ code: TCountryCode, callingCodes: Array<number>, name: string, emojiFlag: string }>

    const allCountries = Object.keys(countries) as Array<TCountryCode>;

    allCountries.forEach((code) => {
        countryData.push({
            code: code,
            name: countries[code].name,
            callingCodes: countries[code].phone,
            emojiFlag: getEmojiFlag(code),
        })
    });

    return countryData
});
