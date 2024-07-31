pipeline {
    agent any

    stages {
        stage('Install npm') {
            steps {
                sh 'npm install'
                }
            }
         stage('test') {
            steps {
                sh 'echo "testing application"'
                }
            }
        stage('deploy') {
            steps {
                sh 'echo "deploy application"'
                }
            }
        }
    }

