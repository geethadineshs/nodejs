pipeline {
    agent any

    environment {
        DEV_SERVER_IP = '13.234.119.246'
        LIVE_SERVER_IP = '65.2.178.1'
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    // Capture the branch name provided by Jenkins
                    def branchName = env.BRANCH_NAME ?: 'main'
                    echo "Branch name: ${branchName}"
                    // Check out the code from the repository
                    checkout([$class: 'GitSCM', branches: [[name: "${branchName}"]],
                              userRemoteConfigs: [[url: 'https://github.com/geethadineshs/nodejs.git']]])
                }
            }
        }

        stage('Deploy to Dev') {
            when {
                branch 'dev'
            }
            steps {
                script {
                    // Use Jenkins SSH credentials for Dev server deployment
                    sshagent(['devserver-ssh']) {
                        sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@${DEV_SERVER_IP} '
                        echo "Changes detected in dev branch" > /home/ubuntu/nodejs/filedev.txt'
                        '''
                    }
                }
            }
        }

        stage('Deploy to Live') {
            when {
                branch 'main'
            }
            steps {
                script {
                    // Use Jenkins SSH credentials for Live server deployment
                    sshagent(['liveserver-ssh']) {
                        sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@${LIVE_SERVER_IP} '
                        echo "Changes detected in main branch" > /home/ubuntu/nodejs/filelive.txt'
                        '''
                    }
                }
            }
        }
    }
}
