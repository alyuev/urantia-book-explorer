/<a id="U31_11_0"><\/a>/d
/<a id="U56_11_0"><\/a>/d
/<a id="U120_4_0"><\/a>/d
/<a id="U134_6_14"><\/a>/d
/<a id="U144_5_11"><\/a>/d
/<a id="U144_5_25"><\/a>/d
/<a id="U144_5_38"><\/a>/d
/<a id="U144_5_54"><\/a>/d
/<a id="U144_5_73"><\/a>/d
/<a id="U144_5_87"><\/a>/d
/<a id="U196_4_0"><\/a>/d
/^$/d
s/<\/p>$//
s/^ *<p>/<p>/
s/  *$//
/<.body>/d
/<.html>/d
/<?xml/,/<body>/d
/blockquote>$/d
s/<span class="SCaps">\(.*\)<\/span>/\U\1/g
s/<sup>([^)]*)<\/sup> //
/<h1>.*<\/h1>/d
/<div class="c1">/d
/<\/div>/d
s/^<p><a id="\(.*\)"><\/a><sup>\(.*:.*\..*\)<\/sup> /<p><a class="\1" href="\.\1"><sup>\2<\/sup><\/a> /
s/^<h4><a id="\(.*\)"><\/a> \(.*\)<\/h4>/<h4><a class="\1" href="\.\1">\2<\/a><\/h4>/
s/<span class="Colored">//g
s/<\/span>//g

/^<h4><a id="\(U42_2_0\)\|\(U42_10_0\)\|\(U59_1_0\)\|\(U59_2_0\)\|\(U59_3_0\)\|\(U61_1_0\)\|\(U61_2_0\)\|\(U61_3_0\)\|\(U61_4_0\)"><\/a>/ {
N
s/<h4><a id="\(U[0-9][0-9]*_[0-9][0-9]*_[0-9][0-9]*\)"><\/a> \(.*\)\n<br \/> \(.*\)<\/h4>/<h4><a class="\1" href=".\1">\2. \3<\/a><\/h4>/
}

/^<h4><a id="\(U51_5_0\)\|\(U148_6_0\)"><\/a>/ {
N
s/<h4><a id="\(U[0-9][0-9]*_[0-9][0-9]*_[0-9][0-9]*\)"><\/a> \(.*\)\n<br \/> \(.*\)<\/h4>/<h4><a class="\1" href=".\1">\2 \3<\/a><\/h4>/
}

/^<h4><a id="\(U57_7_0\)"><\/a>/ {
N
s/<h4><a id="\(U[0-9][0-9]*_[0-9][0-9]*_[0-9][0-9]*\)"><\/a> \(.*\)<br \/>\n \(.*\)<\/h4>/<h4><a class="\1" href=".\1">\2. \3<\/a><\/h4>/
}

/^<h4><a id="\(U57_8_0\)\|\(U59_6_0\)\|\(U60_3_0\)"><\/a>/ {
N
N
s/<h4><a id="\(U[0-9][0-9]*_[0-9][0-9]*_[0-9][0-9]*\)"><\/a> \(.*\)\n<br \/> \(.*\)\n<br \/> \(.*\)<\/h4>/<h4><a class="\1" href=".\1">\2. \3. \4<\/a><\/h4>/
}

/^<h4><a id="\(U59_4_0\)\|\(U59_5_0\)"><\/a>/ {
N
N
N
s/<h4><a id="\(U[0-9][0-9]*_[0-9][0-9]*_[0-9][0-9]*\)"><\/a> \(.*\)\n<br \/> \(.*\)\n<br \/> \(.*\)\n<\/h4>/<h4><a class="\1" href=".\1">\2. \3. \4<\/a><\/h4>/
}