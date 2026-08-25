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
    }
}