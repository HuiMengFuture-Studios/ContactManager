const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();

// 配置 winston 日志库
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

// 创建自定义日志格式
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

// 创建 winston 日志实例
const winston = createLogger({
  format: combine(label({ label: "ContactManager" }), timestamp(), myFormat),
  transports: [
    new transports.Console(), // 输出到控制台
    new transports.File({ filename: "logs/app.log" }), // 输出到文件
  ],
});

const app = express();

// 设置中间件
app.use(cors());
app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 导入路由
const contactRoutes = require('./routes/contactRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const annualPlanRoutes = require('./routes/annualPlanRoutes');
const financeRoutes = require('./routes/financeRoutes'); // 新增
const favorRoutes = require('./routes/favorRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const mediaListRoutes = require('./routes/mediaListRoutes');
const interestRoutes = require('./routes/interestRoutes');
const monthlyPlanRoutes = require('./routes/monthlyPlanRoutes');
const monthlySummaryRoutes = require('./routes/monthlySummaryRoutes');
const dailyPlanRoutes = require('./routes/dailyPlanRoutes');
const dailySummaryRoutes = require('./routes/dailySummaryRoutes');
const annualSummaryRoutes = require('./routes/annualSummaryRoutes');
const creditRoutes = require('./routes/creditRoutes'); // 新增

app.use('/api/contacts', contactRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/annualPlan', annualPlanRoutes);
app.use('/api/finances', financeRoutes); // 新增
app.use('/api/favors', favorRoutes);
app.use('/api/wishlists', wishlistRoutes);
app.use('/api/mediaList', mediaListRoutes);
app.use('/api/interests', interestRoutes);
app.use('/api/monthlyPlan', monthlyPlanRoutes);
app.use('/api/monthlySummary', monthlySummaryRoutes);
app.use('/api/dailyPlan', dailyPlanRoutes);
app.use('/api/dailySummary', dailySummaryRoutes);
app.use('/api/annualSummary', annualSummaryRoutes);
app.use('/api/credits', creditRoutes); // 新增

// 初始化数据库
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate(); // 使用 sequelize.authenticate()
    winston.info('建立数据库连接成功');
    // 同步所有模型
    await sequelize.sync({ force: process.env.NODE_ENV === 'development' }); // 使用 sequelize.sync()
    winston.info('全部模型同步成功');
  } catch (err) {
    winston.error('连接数据库时出错:', err);
    throw err; // 抛出错误以便外部捕获
  }
};

const createError = require("http-errors");
const db = require("./models");
const path = require("path");
const sequelize = db.sequelize;

app.use(express.static(path.join(__dirname, "public")));
initializeDatabase()
    .then(() => {
      winston.info("数据库及其表结构初始化成功");
    })
    .catch((err) => {
      winston.error("数据库Sync错误:", err)
      process.exit(1); // 优雅关闭应用
    });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// 添加全局错误处理程序
process.on("uncaughtException", (err) => {
  winston.error("未捕获的异常:", err);
  process.exit(1); // 优雅关闭应用
});

process.on("unhandledRejection", (reason, promise) => {
  winston.error("未处理的 Promise 拒绝:", reason);
  process.exit(1); // 优雅关闭应用
});

module.exports = app;