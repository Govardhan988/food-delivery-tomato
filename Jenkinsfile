pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Code') {
            steps {
                echo 'Food Delivery source code checked out successfully.'
                sh 'ls -la'
            }
        }
    }
}