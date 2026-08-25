pipeline {
    agent none

    stages {

        // ==========================================
        // 1. CHECKOUT SOURCE CODE
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
    }
}