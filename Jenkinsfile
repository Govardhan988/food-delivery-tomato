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
                        sh '''
                            docker build \
                                -t govardhantanga/food-backend:${BUILD_NUMBER} \
                                ./backend
                        '''
                    }
                }

                stage('Frontend Docker Build') {
                    agent any

                    steps {
                        sh '''
                            docker build \
                                -t govardhantanga/food-frontend:${BUILD_NUMBER} \
                                ./frontend
                        '''
                    }
                }

                stage('Admin Docker Build') {
                    agent any

                    steps {
                        sh '''
                            docker build \
                                -t govardhantanga/food-admin:${BUILD_NUMBER} \
                                ./admin
                        '''
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
                        echo "$DOCKER_PASSWORD" | \
                            docker login \
                            --username "$DOCKER_USERNAME" \
                            --password-stdin

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
                    echo "Checking Kubernetes connection..."

                    kubectl get nodes

                    echo "Checking Helm..."

                    helm version

                    echo "Deploying application..."

                    helm upgrade --install food-delivery ./food-delivery \
                        --set backend.image.repository=govardhantanga/food-backend \
                        --set backend.image.tag=${BUILD_NUMBER} \
                        --set frontend.image.repository=govardhantanga/food-frontend \
                        --set frontend.image.tag=${BUILD_NUMBER} \
                        --set admin.image.repository=govardhantanga/food-admin \
                        --set admin.image.tag=${BUILD_NUMBER}

                    echo "Checking deployment..."

                    kubectl get pods

                    echo "Checking services..."

                    kubectl get services

                    echo "Checking HPA..."

                    kubectl get hpa
                '''
            }
        }
    }

    post {

        success {
            echo 'CI/CD Pipeline completed successfully!'
        }

        failure {
            echo 'CI/CD Pipeline failed.'
        }

        always {
            echo "Build Number: ${BUILD_NUMBER}"
        }
    }
}