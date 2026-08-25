pipeline {
    agent none

    stages {

        stage('Checkout') {
            agent any

            steps {
                checkout scm
            }
        }

        stage('Backend Dependencies') {
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
            parallel {

                stage('Backend Docker Build') {
                    agent any

                    steps {
                        sh 'docker build -t food-backend:${BUILD_NUMBER} ./backend'
                    }
                }

                stage('Frontend Docker Build') {
                    agent any

                    steps {
                        sh 'docker build -t food-frontend:${BUILD_NUMBER} ./frontend'
                    }
                }

                stage('Admin Docker Build') {
                    agent any

                    steps {
                        sh 'docker build -t food-admin:${BUILD_NUMBER} ./admin'
                    }
                }
            }
        }

        stage('Docker Hub Login Test') {
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
                        echo "$DOCKER_PASSWORD" | docker login \
                            -u "$DOCKER_USERNAME" \
                            --password-stdin
                    '''
                }
            }
        }
    }
}