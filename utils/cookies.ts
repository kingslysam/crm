import { getCookie } from "cookies-next";

export function getUserSessionCookie() {
  const rawCookie = getCookie("session");
  if (typeof rawCookie === 'string') {
    return JSON.parse(rawCookie);
  }
  return null;
}

export async function getUserDetailsCookie() {
  const rawCookie = getCookie("user");
  if (typeof rawCookie === 'string') {
    return JSON.parse(rawCookie);
  } else {
    return null;
  }
}

export function getUserFullNameFromCookie() {

  const rawCookie = getCookie("user");
  if (typeof rawCookie === 'string') {
    const parsedUserDetails = JSON.parse(rawCookie);
    const fullName =
      parsedUserDetails.user_metadata.first_name +
      " " +
      parsedUserDetails.user_metadata.last_name;
    return fullName;
  } else {
    return null;
  }
}

export function getUserFullNameSeparatedFromCookie() {
  const rawCookie = getCookie("user");
  if (typeof rawCookie === 'string') {
    const parsedUserDetails = JSON.parse(rawCookie);
    return {
      firstName: parsedUserDetails.user_metadata.first_name,
      lastName: parsedUserDetails.user_metadata.last_name,
    };
  } else {
    return null;
  }
}

export function getUserEmailFromCookie() {
  const rawCookie = getCookie("user");
  if (typeof rawCookie === 'string') {
    const parsedUserDetails = JSON.parse(rawCookie);
    const email = parsedUserDetails.email;
    const emailApp = parsedUserDetails.user_metadata.appKey;
    return {email: email, emailApp: emailApp};
  } else {
    return {email: null, emailApp: null};
  }
}

export function getUserRoleFromCookie(){
  const rawCookie = getCookie("user");
  if (typeof rawCookie === 'string') {
    const parsedUserDetails = JSON.parse(rawCookie);
    const role = parsedUserDetails.user_metadata.role;
    return role;
  } else {
    return null;
  }
}

export function getUserPhoneFromCookie(){
  const rawCookie = getCookie("user");
  if (typeof rawCookie === 'string') {
    const parsedUserDetails = JSON.parse(rawCookie);
    const phoneNumber = parsedUserDetails.user_metadata.phone_number;
    return phoneNumber;
  } else {
    return null;
  }
}

export function getUserLocationFromCookie() {
  const rawCookie = getCookie("user");
  if (typeof rawCookie === 'string') {
    const parsedUserDetails = JSON.parse(rawCookie);
    const location = parsedUserDetails.user_metadata.location;
    return location;
  } else {
    return null;
  }
}

export function getUserBirthDateFromCookie() {
  const rawCookie = getCookie("user");
  if (typeof rawCookie === 'string') {
    const parsedUserDetails = JSON.parse(rawCookie);
    const birthdate = parsedUserDetails.user_metadata.birthdate;
    return birthdate;
  } else {
    return null;
  }
}




