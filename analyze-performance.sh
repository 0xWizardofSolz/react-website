#!/bin/bash
# Performance analysis script for the React website

echo "🚀 Running performance analysis for React website..."
echo "=================================================="

# Build the project
echo "📦 Building production bundle..."
npm run build

# Check bundle sizes
echo ""
echo "📊 Bundle size analysis:"
echo "------------------------"
ls -lh build/static/js/*.js | awk '{print $5 "\t" $9}'
ls -lh build/static/css/*.css | awk '{print $5 "\t" $9}'

# Calculate total size
echo ""
echo "📈 Total bundle sizes:"
echo "---------------------"
total_js=$(du -ch build/static/js/*.js | grep total | cut -f1)
total_css=$(du -ch build/static/css/*.css | grep total | cut -f1)
echo "JavaScript: $total_js"
echo "CSS: $total_css"

# Check for optimization opportunities
echo ""
echo "🔍 Optimization recommendations:"
echo "--------------------------------"

# Check for large dependencies
if [ -f package.json ]; then
    echo "📚 Largest dependencies:"
    npx depcheck --specials=webpack,eslint || echo "Note: Install depcheck globally for dependency analysis"
fi

# Check service worker
if [ -f public/sw.js ]; then
    echo "✅ Service worker implemented"
else
    echo "❌ Service worker missing"
fi

# Check for performance optimizations
echo ""
echo "🎯 Performance checklist:"
echo "-------------------------"
grep -q "React.memo" src/components/*.js && echo "✅ React.memo implemented" || echo "❌ Consider React.memo"
grep -q "useCallback" src/**/*.js && echo "✅ useCallback implemented" || echo "❌ Consider useCallback"
grep -q "useMemo" src/**/*.js && echo "✅ useMemo implemented" || echo "❌ Consider useMemo"
grep -q "lazy" src/App.js && echo "✅ Code splitting implemented" || echo "❌ Consider code splitting"
[ -f src/utils/performance.js ] && echo "✅ Performance monitoring setup" || echo "❌ Performance monitoring missing"

echo ""
echo "✨ Performance analysis complete!"