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
          npx playwright test --workers 8 --project=chromium
        '''
      }
    }
    stage('Publish') {
        echo 'Publish Allure report'
        publishHTML(
                target: [
                        allowMissing         : false,
                        alwaysLinkToLastBuild: false,
                        keepAll              : true,
                        reportDir            : 'target/site/allure-maven-plugin',
                        reportFiles          : 'index.html',
                        reportName           : "Allure Report"
                ]
        )
    }
  }
}