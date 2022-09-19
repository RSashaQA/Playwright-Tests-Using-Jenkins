pipeline {
agent any
  stages {
    stage('install playwright') {
      steps {
        sh '''
          npm i -D @playwright/test
          npm install fs-extra
          npx playwright install
        '''
      }
    }
    stage('test') {
      steps {
        sh '''
          npx playwright test --list
          npx playwright test --workers 8
        '''
      }
      stage('Reports') {
        steps {
           allure([
      	   includeProperties: false,
      	   properties: [],
      	   reportBuildPolicy: 'ALWAYS',
      	   results: [[path: 'report']]
    	   ])
  	        }
      post {
        success {
          archiveArtifacts(artifacts: 'homepage-*.png', followSymlinks: false)
          sh 'rm -rf *.png'
        }
      }
    }
  }
}