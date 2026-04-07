export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },

  SERVICES: {
    GET_ALL: "/services",
    CREATE: "/services",
    UPDATE: (id) => `/services/${id}`,
    DELETE: (id) => `/services/${id}`,
  },

  APPOINTMENTS: {
    GET_ALL: "/appointments",
    BOOK: "/appointments/book",
    CANCEL: (id) => `/appointments/${id}/cancel`,
    COMPLETE: (id) => `/appointments/${id}/complete`,
  },

  PAYMENTS: {
    CREATE: "/payments",
    GET_MY: "/payments/my",
  },

  RECOMMENDATIONS: {
    GET_SERVICES: "/recommendations/services",
  },
};
