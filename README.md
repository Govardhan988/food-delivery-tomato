\# Food Delivery - Docker \& Kubernetes



A full-stack food delivery application containerized with Docker and deployed on Kubernetes using Helm.



The project demonstrates containerization, Kubernetes orchestration, service discovery, persistent storage, RBAC, Ingress routing, and automatic horizontal scaling with HPA.



\---



\ 🚀 Project Overview



The application consists of three main application components:



\- Frontend

\- Admin Panel

\- Backend API



MongoDB is used as the database.



The application is first containerized using Docker and then deployed to a Kubernetes cluster running on Minikube.



Helm is used to package and manage the Kubernetes deployment.



\---



\##  Architecture



```text

                        Browser

                           |

                           v

                   NGINX Ingress

                          |

           +--------------+--------------+

            |              |              |

            v              v              v

      food.local     admin.food.local   api.food.local

            |              |              |

            v              v              v

      Frontend Service  Admin Service  Backend Service

            |              |              |

            v              v              v

      Frontend Pods    Admin Pods     Backend Pods

                                           |

                                           v

                                     MongoDB Service

                                           |

                                           v

                                     MongoDB Pod

                                           |

                                           v

                                         PVC

