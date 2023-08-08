module.exports = {
    //Signup
    '/auth/signup': {
        post: {
            tags: [
                "Auth"
            ],
            summary: "Create new Account.",
            requestBody: {
                description: "Enter details.",
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/customerSignup"
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Signup successful.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/customerSignupResponse"
                            }
                        }
                    }
                },
                500: {
                    description: "Internal sever error.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/commonResponse"
                            }
                        }
                    }

                }
            }
        }
    },

    //login
    "/auth/login": {
        post: {
            tags: [
                "Auth"
            ],
            summary: "Login",
            requestBody: {
                description: "Enter details.",
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/login"
                        },
                    }
                }
            },
            responses: {
                200: {
                    description: "Login successful.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/loginResponse"
                            }
                        }
                    }
                },
                500: {
                    description: "Internal sever error.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/commonResponse"
                            }
                        }
                    }

                }
            }
        }
    },

    "/auth/sociallogin": {
        post: {
            tags: [
                "Auth"
            ],
            summary: "Social Login.",
            requestBody: {
                description: "Enter details.",
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/socialLogin"
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Logged in successfully.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/socialLoginResponse"
                            }
                        }
                    }
                },
                500: {
                    description: "Internal sever error.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/commonResponse"
                            }
                        }
                    }

                }
            }
        }
    },

    "/auth/me": {
        get: {
            tags: [
                "Auth"
            ],
            summary: "Home Page",
            parameters: [
                {
                    $ref: "#/components/parameters/access_token"
                }
            ],
            responses: {
                200: {
                    description: "Home Page",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/meResponse"
                            }
                        }
                    }
                },
                500: {
                    description: "Internal sever error.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/commonResponse"
                            }
                        }
                    }

                }
            }
        }
    },
}