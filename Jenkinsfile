pipeline {
    agent any

    environment {
        DEV_SERVER_IP = '13.234.119.246'
        LIVE_SERVER_IP = '65.2.178.1'
    }

    stages {
        stage('Check Branch and Create File') {
            steps {
                script {
                    // Determine which branch is being built
                    def branchName = env.BRANCH_NAME ?: 'main'
                    echo "Branch name: ${branchName}"

                    // Set the appropriate file name and server IP based on the branch
                    def fileName
                    def serverIP
                    if (branchName == 'main') {
                        fileName = 'filelive.txt'
                        serverIP = LIVE_SERVER_IP
                    } else if (branchName == 'dev') {
                        fileName = 'filedev.txt'
                        serverIP = DEV_SERVER_IP
                    } else {
                        error "No deployment action for branch: ${branchName}"
                    }

                    // Use Jenkins SSH credentials to access the server and create the file
                    sshagent(['your-ssh-credentials-id']) {  // Replace with your SSH credentials ID
                        sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${serverIP} '
                        echo "${fileName}" > /home/ubuntu/nodejs/${fileName}
                        '
                        """
                    }
                }
            }
        }
    }
}
