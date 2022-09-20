pipeline {
agent any
  stages {
    stage('Prepare playwright') {
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
          npx playwright test example.spec.js --workers 1 --project=chromium
        '''
      }
    }
  }
      post {
        always { 
                publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: [[path: 'target/playwright-report']],
                reportFiles: "index.html",
                reportName: "report",
                reportTitles: "title"
                ])
    }
  }
}