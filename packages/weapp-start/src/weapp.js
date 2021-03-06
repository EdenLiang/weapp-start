#!/usr/bin/env node
import inquirer from 'inquirer';
import yargs from 'yargs';
import { existsSync, readdirSync, lstatSync } from 'fs';
import { join } from 'path';
import chalk from 'chalk';
import rimraf from 'rimraf';
import download from 'download-git-repo';
import { saveCopy } from './utils/save';
import start from './start';

const argv = yargs // eslint-disable-line
  .usage('$0 <command> [options]')
  .command('dev', 'watch build', argv => {
    start('dev');
  })
  .command('build', '打包构建', argv => {
    start('build');
  })
  .command('init', '生成模版项目', () => {
    console.log(chalk.green('下载模板组中，请稍后...'));
    const temp = '__temp';
    download('tolerance-go/weapp-start-templates', temp, function(err) {
      if (err) {
        rimraf.sync(temp);
        return console.log(chalk.red('下载模板组失败，请重试几次看看', err));
      }
      console.log(chalk.green('下载模板组成功，生成临时目录', temp));
      const tpls = readdirSync(temp).filter(file => {
        if (lstatSync(join(temp, file)).isDirectory()) {
          return true;
        }
      });
      const prompt = inquirer.createPromptModule();
      prompt([
        {
          name: 'name',
          type: 'input',
          message: '请输入项目名称',
          default: 'weappDemo',
          validate(name) {
            const cwd = process.cwd();
            if (existsSync(join(cwd, name))) {
              console.log(chalk.red('已存在同名文件'));
              return false;
            }
            return true;
          },
        },
        {
          name: 'tpl',
          type: 'list',
          choices: tpls,
          message: '请选择模版类型',
        },
      ])
        .then(input => {
          saveCopy(join(temp, input.tpl), input.name);
          rimraf.sync(temp);
          console.log(chalk.green('Thanks for your use! @bzone'));
        })
        .catch(err => {
          rimraf.sync(temp);
          console.log(chalk.red(err));
        });
    });
  })
  .command('new', '生成模板页面', () => {
    const prompt = inquirer.createPromptModule();
    prompt([
      {
        name: 'type',
        type: 'list',
        choices: ['page', 'component', 'app'],
        message: '请选择生成类型',
      },
      {
        name: 'name',
        type: 'input',
        message: '请输入组件名称',
        validate(name) {
          if (!name) {
            console.log(chalk.red('必填项目'));
          }
          return !!name;
        },
      },
    ])
      .then(input => {
        saveCopy(join(__dirname, '../tpls', input.type), input.name);
        console.log(chalk.green('generate done!'));
      })
      .catch(err => {
        console.log(chalk.red(err));
      });
  })
  .help()
  .alias('h', 'help')
  .alias('v', 'version').argv;
