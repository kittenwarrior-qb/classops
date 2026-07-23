import assert from 'node:assert/strict'
import test from 'node:test'
import { matchesSearch, removeDiacritics, sortByVietnameseName, vietnameseNameKey } from '../src/lib/vietnamese'

test('sorts Vietnamese names by given name', () => {
  const names = ['Nguyễn Ý An', 'Trần Minh Châu', 'Lê Gia Hân']
  assert.deepEqual(sortByVietnameseName(names, (name) => name), ['Nguyễn Ý An', 'Trần Minh Châu', 'Lê Gia Hân'])
  assert.equal(vietnameseNameKey('Nguyễn Ý An'), 'An Nguyễn Ý')
})

test('search ignores Vietnamese diacritics including đ', () => {
  assert.equal(removeDiacritics('Đặng Dũng'), 'Dang Dung')
  assert.equal(matchesSearch('Đặng Dũng', 'dung'), true)
  assert.equal(matchesSearch('Nguyễn Ý An', 'y an'), true)
  assert.equal(matchesSearch('Nguyễn Ý An', 'mai'), false)
})
