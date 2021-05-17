import * as shell from 'shelljs'

shell.cp('-R', 'src/public', 'dist/public')
shell.cp('-R', 'src/resources', 'dist/resources')
shell.cp('-R', 'src/ssl', 'dist/ssl')
