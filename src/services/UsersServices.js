import { api } from "./api";

const makeQueryParams = (consultation) => {
  const keys = Object.keys(consultation);
  let newConsultation = "";
  keys.map((key) => {
    if (consultation[key]) newConsultation += `${key}=${consultation[key]}&`;
  });
  return newConsultation;
};

export default class UsersService {
  static getMentoringGroups(token, filters) {
    const newFilters = makeQueryParams(filters);
    return api.get(`/users/mentoring-groups?${newFilters}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  static createMentor(token, mentor) {
    return api.post("/users/mentors", mentor, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  static getAllFiltered(token, filters) {
    const newFilters = makeQueryParams(filters);
    return api.get(`/users?${newFilters}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
