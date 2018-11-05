# -*- coding: utf-8 -*-
"""Wrapper to run zgoubi from the command line.

:copyright: Copyright (c) 2018 RadiaSoft LLC.  All Rights Reserved.
:license: http://www.apache.org/licenses/LICENSE-2.0.html
"""
from __future__ import absolute_import, division, print_function
from pykern import pkio
from pykern.pkdebug import pkdp, pkdc
from sirepo import simulation_db
from sirepo.template import template_common
import py.path
import sirepo.template.zgoubi as template
import subprocess


#TODO(pjm): change to 'zgoubi' when available in container
_EXE_PATH = '/home/vagrant/bin/zgoubi'


def run(cfg_dir):
    _run_zgoubi(cfg_dir)
    template.save_report_data(simulation_db.read_json(template_common.INPUT_BASE_NAME), py.path.local(cfg_dir))


def run_background(cfg_dir):
    res = {}
    data = simulation_db.read_json(template_common.INPUT_BASE_NAME)
    try:
        _run_zgoubi(cfg_dir)
    except Exception as e:
        res = {
            'error': str(e),
        }
    simulation_db.write_result(res)


def _run_zgoubi(cfg_dir):
    with pkio.save_chdir(cfg_dir):
        exec(pkio.read_text(template_common.PARAMETERS_PYTHON_FILE), locals(), locals())
        subprocess.call([_EXE_PATH])