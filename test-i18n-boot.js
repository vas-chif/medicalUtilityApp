// Test script to debug i18n boot file
console.log('🔍 Testing i18n boot imports...\n');

try {
  console.log('1. Testing basic imports...');
  const itIT = require('./src/i18n/it-IT/index.ts');
  console.log('   ✅ it-IT/index.ts loaded');

  const enUS = require('./src/i18n/en-US/index.ts');
  console.log('   ✅ en-US/index.ts loaded');

  console.log('\n2. Testing calculator namespaces...');
  const crclIT = require('./src/i18n/it-IT/crcl.ts');
  console.log('   ✅ it-IT/crcl.ts loaded');
  console.log('      Type:', typeof crclIT.default);
  console.log('      Has title:', !!crclIT.default?.title);

  const egfrIT = require('./src/i18n/it-IT/egfr.ts');
  console.log('   ✅ it-IT/egfr.ts loaded');
  console.log('      Type:', typeof egfrIT.default);
  console.log('      Has title:', !!egfrIT.default?.title);

  console.log('\n3. Testing object spread...');
  const testMerge = {
    ...itIT.default,
    crcl: crclIT.default,
    egfr: egfrIT.default,
  };
  console.log('   ✅ Object merge successful');
  console.log('      Keys:', Object.keys(testMerge).length);

  console.log('\n✅ All tests passed!');
} catch (error) {
  console.error('\n❌ ERROR:', error.message);
  console.error('Stack:', error.stack);
  process.exit(1);
}
