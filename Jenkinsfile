pipeline {
    agent none

    stages {

        // ==========================================
        // 1. CHECKOUT
        // ==========================================
        stage('Checkout') {
            agent any

            steps {
                checkout scm
            }
        }

        // ==========================================
        // 2. BACKEND CI
        // ==========================================
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

        // ==========================================
        // 3. FRONTEND CI
        // ==========================================
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

        // ==========================================
        // 4. ADMIN CI
        // ==========================================
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

        // ==========================================
        // 5. BUILD ALL DOCKER IMAGES IN PARALLEL
        // ==========================================
        stage('Docker Build') {

            parallel {

                stage('Backend Docker Build') {
                    agent any

                    steps {
                        sh '''
                            docker build \
                                -t food-backend:${BUILD_NUMBER} \
                                ./backend
                        '''
                    }
                }

                stage('Frontend Docker Build') {
                    agent any

                    steps {
                        sh '''
                            docker build \
                                -t food-frontend:${BUILD_NUMBER} \
                                ./frontend
                        '''
                    }
                }

                stage('Admin Docker Build') {
                    agent any

                    steps {
                        sh '''
                            docker build \
                                -t food-admin:${BUILD_NUMBER} \
                                ./admin
                        '''
                    }
                }
            }
        }

        // ==========================================
        // 6. PUSH ALL IMAGES TO DOCKER HUB
        // ==========================================
        stage('Push Docker Images') {
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

                        docker tag food-backend:${BUILD_NUMBER} \
                            ${DOCKER_USERNAME}/food-backend:${BUILD_NUMBER}

                        docker tag food-frontend:${BUILD_NUMBER} \
                            ${DOCKER_USERNAME}/food-frontend:${BUILD_NUMBER}

                        docker tag food-admin:${BUILD_NUMBER} \
                            ${DOCKER_USERNAME}/food-admin:${BUILD_NUMBER}

                        docker push \
                            ${DOCKER_USERNAME}/food-backend:${BUILD_NUMBER}

                        docker push \
                            ${DOCKER_USERNAME}/food-frontend:${BUILD_NUMBER}

                        docker push \
                            ${DOCKER_USERNAME}/food-admin:${BUILD_NUMBER}

                        docker logout
                    '''
                }
            }
        }
    }
}