'use client';

import React, { useState } from 'react';
import { isHoliday } from '@/app/utils/holidays';

export const Calendar: React.FC = () => {
  const today = new Date();
  const [displayDate, setDisplayDate] = useState(new Date());
  const currentMonth = displayDate.getMonth();
  const currentYear = displayDate.getFullYear();
  const currentDate = today.getDate();
  const isToday = (date: number) => {
    return currentYear === today.getFullYear() &&
           currentMonth === today.getMonth() &&
           date === today.getDate();
  };

  // 月の最初の日を取得
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const startingDay = firstDayOfMonth.getDay();

  // 月の日数を取得
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // 曜日の配列
  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

  // カレンダーの日付を生成
  const generateCalendarDays = () => {
    const days = [];
    let dayCount = 1;

    // 常に6週間分のループ
    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startingDay) {
          // 月の開始日までの空白
          week.push(null);
        } else if (dayCount > daysInMonth) {
          // 月の最終日以降の空白
          week.push(null);
        } else {
          week.push(dayCount);
          dayCount++;
        }
      }
      days.push(week);
    }
    return days;
  };

  const handlePrevMonth = () => {
    const newDate = new Date(displayDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setDisplayDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(displayDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setDisplayDate(newDate);
  };

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={handlePrevMonth}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="text-sm font-medium text-gray-900 dark:text-white">
          {`${currentYear}年${currentMonth + 1}月`}
        </div>
        <button
          onClick={handleNextMonth}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {/* 曜日のヘッダー */}
        <div className="col-span-7 grid grid-cols-7">
          {weekDays.map((day, index) => (
            <div
              key={day}
              className={`text-center text-xs font-medium ${
                index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-500'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
        {/* カレンダーの日付 */}
        <div className="col-span-7 grid grid-cols-7 grid-rows-6 h-[168px]">
          {generateCalendarDays().map((week, weekIndex) => (
            <React.Fragment key={weekIndex}>
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`text-center flex items-center justify-center text-sm rounded-lg ${
                    day && isToday(day)
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                      : day
                      ? 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      : ''
                  } ${
                    day && (
                      dayIndex === 0 || 
                      dayIndex === 6 || 
                      isHoliday(new Date(currentYear, currentMonth, day))
                    )
                      ? 'text-red-500'
                      : day
                      ? 'text-gray-900 dark:text-white'
                      : ''
                  }`}
                  title={day ? isHoliday(new Date(currentYear, currentMonth, day)) || '' : ''}
                >
                  {day}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
