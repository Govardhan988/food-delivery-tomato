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
    }
}