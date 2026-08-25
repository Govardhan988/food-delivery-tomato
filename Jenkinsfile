pipeline {
    agent none

    stages {

        stage('Checkout') {
            agent any

            steps {
                checkout scm
            }
        }

        stage('Backend CI') {
            agent any

            tools {
                nodejs 'Node24'
            }

            steps {
                dir('backend') {
                    sh 'node --version'
                    sh 'npm --version'
                    sh 'npm ci'
                }
            }
        }

        stage('Frontend CI') {
            agent any

            tools {
                nodejs 'Node24'
            }

            steps {
                dir('frontend') {
                    sh 'node --version'
                    sh 'npm --version'
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }

        stage('Admin CI') {
            agent any

            tools {
                nodejs 'Node24'
            }

            steps {
                dir('admin') {
                    sh 'node --version'
                    sh 'npm --version'
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Build') {
            agent any

            parallel {

                stage('Backend Docker Build') {
                    steps {
                        sh 'docker build -t govardhantanga/food-backend:${BUILD_NUMBER} ./backend'
                    }
                }

                stage('Frontend Docker Build') {
                    steps {
                        sh 'docker build -t govardhantanga/food-frontend:${BUILD_NUMBER} ./frontend'
                    }
                }

                stage('Admin Docker Build') {
                    steps {
                        sh 'docker build -t govardhantanga/food-admin:${BUILD_NUMBER} ./admin'
                    }
                }
            }
        }

        stage('Docker Push') {
            agent any

            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

                        docker push govardhantanga/food-backend:${BUILD_NUMBER}
                        docker push govardhantanga/food-frontend:${BUILD_NUMBER}
                        docker push govardhantanga/food-admin:${BUILD_NUMBER}

                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            agent any

            environment {
                KUBECONFIG = '/var/jenkins_home/.kube/config'
            }

            steps {
                sh '''
                    kubectl get nodes

                    helm upgrade --install food-delivery ./food-delivery \
                        --set backend.image.tag=${BUILD_NUMBER} \
                        --set frontend.image.tag=${BUILD_NUMBER} \
                        --set admin.image.tag=${BUILD_NUMBER}

                    kubectl get pods
                '''
            }
        }
    }
}