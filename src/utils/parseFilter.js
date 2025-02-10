// import { query } from "express";
import { CATEGORIES, FAVOURITES } from "../constants/index.js";

const parseFavourite = (isFavourite) => {
    if (FAVOURITES.includes(isFavourite)) {
        return (isFavourite === "true");
    }
};

const parseCategory = (contactType) => {
    if (CATEGORIES.includes(contactType)){
        return contactType;
    }
};

export const parseFilters = (query) => {
    return {
        contactType: parseCategory(query.contactType),
        isFavourite: parseFavourite(query.isFavourite),
    };
};

