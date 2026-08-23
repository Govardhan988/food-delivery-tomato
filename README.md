&#x20;Food Delivery - Docker \& Kubernetes



A full-stack food delivery application containerized with Docker and deployed on Kubernetes using Helm.



The project demonstrates containerization, Kubernetes orchestration, service discovery, persistent storage, RBAC, Ingress routing, and automatic horizontal scaling with HPA.



\---



&#x20;Project Overview



The application consists of three main application components:



\- Frontend

\- Admin Panel

\- Backend API



MongoDB is used as the database.



The application is first containerized using Docker and then deployed to a Kubernetes cluster running on Minikube.



Helm is used to package and manage the Kubernetes deployment.





&#x20;Architecture





&#x20;                        Browser

&#x20;                           |

&#x20;                           v

&#x20;                   NGINX Ingress

&#x20;                           |

&#x20;            +--------------+--------------+

&#x20;            |              |              |

&#x20;            v              v              v

&#x20;      food.local     admin.food.local   api.food.local

&#x20;            |              |              |

&#x20;            v              v              v

&#x20;      Frontend Service  Admin Service  Backend Service

&#x20;            |              |              |

&#x20;            v              v              v

&#x20;      Frontend Pods    Admin Pods     Backend Pods

&#x20;                                           |

&#x20;                                           v

&#x20;                                     MongoDB Service

&#x20;                                           |

&#x20;                                           v

&#x20;                                     MongoDB Pod

&#x20;                                           |

&#x20;                                           v

&#x20;                                         PVC

