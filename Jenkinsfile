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

        stage('Docker Build') {
            agent any

            steps {
                sh 'docker build -t food-backend:${BUILD_NUMBER} ./backend'
            }
        }

        stage('Push Docker Image') {
            agent any

            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'github-ghcr',
                        usernameVariable: 'GHCR_USER',
                        passwordVariable: 'GHCR_TOKEN'
                    )
                ]) {
                    sh '''
                        echo "$GHCR_TOKEN" | docker login ghcr.io \
                            -u "$GHCR_USER" \
                            --password-stdin

                        docker tag food-backend:${BUILD_NUMBER} \
                            ghcr.io/govardhan988/food-backend:${BUILD_NUMBER}

                        docker push \
                            ghcr.io/govardhan988/food-backend:${BUILD_NUMBER}

                        docker logout ghcr.io
                    '''
                }
            }
        }
    }
}