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

            steps {
                dir('backend') {
                    sh 'npm ci'
                }
            }
        }
    }
}